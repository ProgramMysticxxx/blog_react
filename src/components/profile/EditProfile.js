import { useEffect, useId, useState } from 'react';
import blogClient from '../../utils/blog_client';
import { getAuthHeaders } from '../../utils/auth_utils';
import { getTokenCookie } from '../../utils/cookie_manager';
import iconIncognito from '../../resources/img/icons/icon-incognito.svg';
import { timeoutPreloader, usePreloader } from '../preloader/Preloader';

const SaveStatus = {
    NONE: 0,
    SAVING: 1,
    SUCCESS: 2,
    ERROR: 3,
};

async function fetchProfile(username, setProfile, { preloader }) {
    let client = await blogClient.init();
    try {
        let result = await client.getProfile(
            {
                username: username,
                include_email: true,
            },
            {},
            getAuthHeaders(),
        );
        setProfile(result.data);
        timeoutPreloader(preloader, false);
    } catch (error) {
        setProfile(undefined);
    }
}

async function saveProfile(
    profile,
    newData,
    setSaveStatus,
    setProfile,
) {
    setSaveStatus(SaveStatus.SAVING);
    let client = await blogClient.init();
    try {
        let uploadedAvatar = undefined;
        if (!newData.delete_avatar && newData.avatar) {
            let result = await client.uploadImage(
                {},
                { image: newData.avatar },
                {
                    headers: {
                        'Authorization': `Token ${getTokenCookie()}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            uploadedAvatar = result.data;
        }
        let result = await client.partialUpdateProfile(
            {
                username: profile.username,
                include_email: true,
            },
            {
                public_name: newData.public_name ? newData.public_name : "",
                bio: newData.bio ? newData.bio : "",
                avatar: newData.delete_avatar === true ? null : uploadedAvatar?.id,
            },
            getAuthHeaders(),
        );
        setProfile(result.data);
        setSaveStatus(SaveStatus.SUCCESS);
    } catch (error) {
        setSaveStatus(SaveStatus.ERROR);
        console.error(error);
    }
}

export default function EditProfile({ username }) {
    const preloader = usePreloader();

    const [profile, setProfile] = useState(null);

    const avatarId = useId();
    const [avatar, setAvatar] = useState(null);

    const deleteAvatarId = useId();
    const [deleteAvatar, setDeleteAvatar] = useState(false);

    const publicNameId = useId();
    const [publicName, setPublicName] = useState('');

    const bioId = useId();
    const [bio, setBio] = useState('');

    const [saveStatus, setSaveStatus] = useState(SaveStatus.NONE);

    const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState(null);

    useEffect(
        () => { fetchProfile(username, setProfile, { preloader }); },
        [username, preloader],
    );

    useEffect(
        () => {
            if (profile) {
                setPublicName(profile.public_name);
                setBio(profile.bio);
            }
        },
        [profile],
    );

    function onSaveClick() {
        saveProfile(
            profile,
            {
                public_name: publicName,
                bio: bio,
                avatar: avatar,
                delete_avatar: deleteAvatar,
            },
            setSaveStatus,
            setProfile,
        );
    }

    function onClearClick() {
        setAvatar(null);
        if (uploadedAvatarUrl) {
            URL.revokeObjectURL(uploadedAvatarUrl);
            setUploadedAvatarUrl(null);
        }
        let avatarInput = document.getElementById(avatarId);
        avatarInput.value = null;
    }



    if (profile === null) {
        return (
            <p className='edit-profile__loading'>Loading...</p>
        );
    }

    if (profile === undefined) {
        return (
            <p className='edit-profile__loading'>Loading failed</p>
        );
    }



    function onAvatarChange(e) {
        e.preventDefault();
        const file = e.target.files[0];
        if (uploadedAvatarUrl) {
            URL.revokeObjectURL(uploadedAvatarUrl);
            setUploadedAvatarUrl(null);
        }
        setAvatar(file);
        setUploadedAvatarUrl(URL.createObjectURL(file));
    }

    function getPreviewAvatar() {
        if (deleteAvatar) {
            return iconIncognito;
        }

        return uploadedAvatarUrl ?? profile.avatar_url ?? iconIncognito;
    }

    return (
        <div className="profile__edit">
            <div className="container container__main">
                <h2 className='title title_blocks'>Edit Profile</h2>
                <div className="profile__edit__editor">
                    <img style={{ background: `url(${getPreviewAvatar()}) center center/cover no-repeat`}} className="profile__edit__avatar" />
                    <div className="profile__edit__points">
                        <div className="cover__btns profile__edit_btns">
                            <p className='profile__edit__text'>Change your avatar: </p>
                            <label htmlFor={avatarId} class="button button_cover">
                                Choose file
                            </label>
                            <input id={avatarId} onChange={onAvatarChange} type='file' accept='image/*' />
                            <button onClick={onClearClick} className='button button_cover'>Сlear file</button>
                        </div>
                        <label className="checkbox">
                            <p className="profile__edit__text">Delete avatar?</p>
                            <input type="checkbox" name="checkbox" className='real-checkbox' id={deleteAvatarId} value={deleteAvatar} onChange={(e) => setDeleteAvatar(e.target.checked)} />
                            <span className='custom-checkbox'></span>
                        </label>
                        <form className='form_profile_editor'>
                            <input type="text" placeholder="Username" disabled value={username} />
                            {profile.email && <input type="email" placeholder="Email" disabled value={profile.email} />}
                            <input id={publicNameId} value={publicName} onChange={(e) => setPublicName(e.target.value)} type="text" placeholder="Public name" />
                            <textarea id={bioId} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
                        </form>
                    </div>
                </div>
                <div className="profile__edit_btn">
                    {saveStatus === SaveStatus.SAVING ?
                        <p className='button button_contact button_save' style={{transform: 'scale(1)'}}>Saving...</p>
                        :
                        <button className='button button_contact button_save' style={{transform: 'scale(1)'}} onClick={onSaveClick}>Save</button>
                    }
                    {saveStatus === SaveStatus.ERROR &&
                        <p className='profile__edit__mess_text'>ERROR</p>
                    }
                    {saveStatus === SaveStatus.SUCCESS &&
                        <p className='profile__edit__mess_text'>SUCCESS</p>
                    }
                </div>
            </div>
        </div>
    );
}