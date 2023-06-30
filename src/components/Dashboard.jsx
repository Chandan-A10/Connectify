import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React from 'react'
import { storage } from '../firebase/firebase'


const Dashboard = () => {
    const handleClick = (e) => {
        e.preventDefault()
        console.log(e.target.input.files[0])
        const upload=ref(storage,'images')
        const uploadTask=uploadBytesResumable(upload,e.target.input.files[0])
        uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);

    }
    return (
        <div>
            <form onSubmit={handleClick}>
                <label>Upload file</label>
                <input  name="input" type='file'></input>
                <input  type='submit'></input>
            </form>
        </div>
    )
}

export default Dashboard