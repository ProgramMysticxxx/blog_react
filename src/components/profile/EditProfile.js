import { useEffect, useId, useState } from 'react';
import './edit_profile.scss';
import blogClient from '../../utils/blog_client';
import { getAuthHeaders } from '../../utils/auth_utils';
import { getTokenCookie } from '../../utils/cookie_manager';
import iconIncognito from '../../resources/img/icons/icon-incognito.svg';

const SaveStatus = {
    NONE: 0,
    SAVING: 1,
    SUCCESS: 2,
    ERROR: 3,
};

async function fetchProfile(username, setProfile) {
    let client = await blogClient.init();
    try {
        let result = await client.getProfile(
            {
                username: username,
            },
            {},
            getAuthHeaders(),
        );
        setProfile(result.data);
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
            },
            {
                public_name: newData.public_name ? newData.public_name : undefined,
                bio: newData.bio ? newData.bio : undefined,
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
    let [profile, setProfile] = useState(null);

    let avatarId = useId();
    let [avatar, setAvatar] = useState(null);

    let deleteAvatarId = useId();
    let [deleteAvatar, setDeleteAvatar] = useState(false);

    let publicNameId = useId();
    let [publicName, setPublicName] = useState('');

    let bioId = useId();
    let [bio, setBio] = useState('');

    let [saveStatus, setSaveStatus] = useState(SaveStatus.NONE);

    useEffect(
        () => { fetchProfile(username, setProfile); },
        [username],
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

    return (
        <div className="edit-profile">
            <h1>Edit Profile</h1>
            <img alt="avatar" className="edit-profile__avatar" src={profile.avatar_url ?? iconIncognito} />
            <label>
                New avatar <input id={avatarId} onChange={(e) => setAvatar(e.target.files[0])} type='file' />
                <button onClick={onClearClick}>Clear</button>
            </label>
            <label>Delete avatar? <input id={deleteAvatarId} type='checkbox' value={deleteAvatar} onChange={(e) => setDeleteAvatar(e.target.checked)} /></label>
            <input type="text" placeholder="Username" disabled />
            <input type="email" placeholder="Email" disabled />
            <input id={publicNameId} value={publicName} onChange={(e) => setPublicName(e.target.value)} type="text" placeholder="Public name" />
            <textarea id={bioId} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
            {saveStatus === SaveStatus.SAVING ?
                <p>Saving...</p>
                :
                <button className='edit-profile__save' onClick={onSaveClick}>Save</button>
            }
            {saveStatus === SaveStatus.ERROR &&
                <p>ERROR</p>
            }
            {saveStatus === SaveStatus.SUCCESS &&
                <p>SUCCESS</p>
            }
        </div>
    );
}