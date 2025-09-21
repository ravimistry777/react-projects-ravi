import UserProfileCard from './components/UserProfileCard';
import ravi from './photos/my-pic2.png';
import darshit from './photos/file.jpg';
import luv from './photos/file-1.jpg';
import sagar from './photos/untitled.jpg';

function App() {
  const users = [
    {
      name: 'Ravi Siddhapura',
      email: 'ravisiddhapura777@gmail.com',
      profilePicture: ravi,
      location: 'Gujarat, India',
      phone: '+91 7069695001',
      bio: 'A passionate full-stack developer who loves building things with React.',
      dob: '23-08-2001',
      jobTitle: 'Full-stack Developer',
      website: 'https://ravi-siddhapura-portfolio.netlify.app/'
    },
    {
      name: 'Darshit Shekhda',
      email: 'darshitshekhda@gmail.com',
      profilePicture: darshit,
      location: 'Gujarat, India',
      phone: '+91 9714920969',
      bio: 'UI/UX designer with a love for clean, minimalistic designs.',
      dob: '25-11-2001',
      jobTitle: 'UI/UX Designer',
      website: 'https://darshit.design'
    },
    {
      name: 'Luv Dhameliya',
      email: 'luvdhameliya@gmail.com',
      profilePicture: luv,
      location: 'Gujarat, India',
      phone: '+91 7567655955',
      bio: 'Backend developer specializing in Node.js and databases.',
      dob: '12-05-2004',
      jobTitle: 'Backend Developer',
      website: 'https://luv.dev'
    },
    {
      name: 'Sagar Dodia',
      email: 'sagardodia@gmail.com',
      profilePicture: sagar,
      location: 'Mumbai, India',
      phone: '+91 999999991',
      bio: 'Backend developer specializing in Node.js and databases.',
      dob: '15-10-1999',
      jobTitle: 'Backend Developer',
      website: 'https://sagar.dev'
    }
  ];

  return (
    <div className="cards-container">
      {users.map((user, index) => (
        <UserProfileCard key={index} {...user} />
      ))}
    </div>
  );
}

export default App;
