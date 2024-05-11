import { useEffect, useId, useState } from 'react';
import './edit_profile.scss';
import blogClient from '../../utils/blog_client';
import { getAuthHeaders } from '../../utils/auth_utils';

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

async function saveProfile(profile, newData, setSaveStatus) {
    setSaveStatus(SaveStatus.SAVING);
    let client = await blogClient.init();
    try {
        await client.partialUpdateProfile(
            {
                username: profile.username,
            },
            {
                public_name: newData.public_name ? newData.public_name : undefined,
                bio: newData.bio ? newData.bio : undefined,
            },
            getAuthHeaders(),
        );
        setSaveStatus(SaveStatus.SUCCESS);
    } catch (error) {
        setSaveStatus(SaveStatus.ERROR);
        console.error(error);
    }
}

export default function EditProfile({ username }) {
    let [profile, setProfile] = useState(null);

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
            },
            setSaveStatus,
        );
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
            <img alt="avatar" className="edit-profile__avatar" src={profile.avatar_url} />
            <label>New avatar <input type='file' /></label>
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