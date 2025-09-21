import './UserProfileCard.css';

const UserProfileCard = ({ name, email, profilePicture, location, phone, bio, dob, jobTitle, website }) => {
  return (
    <div className="profile-card">
      <img
        className="profile-img"
        src={profilePicture}
        alt={`${name}'s profile`}
      />
      <h2>{name}</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>DOB:</strong> {dob}</p>
      <p><strong>Job:</strong> {jobTitle}</p>
      <a className="website-link" href={website} target="_blank" rel="noopener noreferrer">
        Visit Website
      </a>
      <p className="bio"><em>{bio}</em></p>
    </div>
  );
};

export default UserProfileCard;
