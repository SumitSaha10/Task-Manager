import React from 'react'

export default function About() {

  return (
    <div className='about'>
      <h2>Welcome to TaskManager</h2>
      <p className='main-description'>
        At TaskManager, our mission is to provide you with a powerful and intuitive task-taking app that simplifies your life. Whether you're a student, professional, or creative individual, TaskManager is designed to help you stay organized, capture ideas on the go, and boost your productivity.
      </p>
      <h3>Key Features</h3>
      <ul>
        <li>
          <span className='features-point'>Never Miss a Deadline</span>: Set reminders and due dates for your tasks, and our notification system will keep you on track. Stay organized and meet your goals effortlessly.
        </li>
        <li>
          <span className='features-point'>Access Anywhere, Anytime</span>: Your tasks are securely stored in the cloud, ensuring they're accessible from any device. Take your tasks with you wherever you go.
        </li>
        <li>
          <span className='features-point'>Collaboration Made Easy</span>: Share tasks with colleagues, classmates, or friends for collaborative projects. Enjoy real-time collaboration and ensure everyone stays on the same page.
        </li>
        <li>
          <span className='features-point'>Effortless Task Creation</span>: With our user-friendly interface, creating tasks is a breeze. Edit,add,delete your text effortlessly.
        </li>
      </ul>
      <h3>Build With Latest Technologies</h3>
      <p>TaskManager is built using the latest web technologies, including Node.js for the backend, React for the frontend, and MongoDB for secure data storage. We prioritize performance, security, and scalability to ensure a seamless and reliable task-taking experience.</p>
    </div>
  )
}

