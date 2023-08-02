import React from 'react'

export default function About() {

  return (
    <div className='about'>
      <h2>Welcome to Mynotebook</h2>
      <p className='main-description'>
        At Mynotebook, our mission is to provide you with a powerful and intuitive note-taking app that simplifies your life. Whether you're a student, professional, or creative individual, Mynotebook is designed to help you stay organized, capture ideas on the go, and boost your productivity.
      </p>
      <h3>Key Features</h3>
      <ul>
        <li>
          <span className='features-point'>Never Miss a Deadline</span>: Set reminders and due dates for your notes, and our notification system will keep you on track. Stay organized and meet your goals effortlessly.
        </li>
        <li>
          <span className='features-point'>Access Anywhere, Anytime</span>: Your notes are securely stored in the cloud, ensuring they're accessible from any device. Take your notes with you wherever you go.
        </li>
        <li>
          <span className='features-point'>Collaboration Made Easy</span>: Share notes with colleagues, classmates, or friends for collaborative projects. Enjoy real-time collaboration and ensure everyone stays on the same page.
        </li>
        <li>
          <span className='features-point'>Effortless Note Creation</span>: With our user-friendly interface, creating notes is a breeze. Format your text, add images, and embed multimedia effortlessly.
        </li>
      </ul>
      <h3>Build With Latest Technologies</h3>
      <p>NoteMaster is built using the latest web technologies, including Node.js for the backend, React for the frontend, and MongoDB for secure data storage. We prioritize performance, security, and scalability to ensure a seamless and reliable note-taking experience.</p>
    </div>
  )
}

