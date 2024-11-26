import Image from 'next/image';
import React from 'react';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Shahoriar Azad Niloy',
      role: 'Founder & Director',
      image: '/images/about/1.JPG',
      socialLinks: {},
    },
    {
      name: 'Devesh Biswas',
      role: 'Chief Operating Officer',
      image: '/images/about/1.JPG',
      socialLinks: {},
    },
    {
      name: 'Md Shamim',
      role: 'Director - Hotels',
      image: '/images/about/1.JPG',
      socialLinks: {},
    },
    {
      name: 'Rabindro nath barman',
      role: 'Chief Executive',
      image: '/images/about/1.JPG',
      socialLinks: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
      },
    },

  ];

  return (

    <div className=' bg-bg-1 py-10'>
    <div className='max-w-[1380px] mx-auto' style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Section Header */}
      <h4 className='text-xl' style={{ color: 'red', marginBottom: '10px' }}>Team</h4>
      <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Our Amazing Team</h2>

      {/* Team Members */}
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
        {teamMembers.map((member, index) => (
          <div
            key={index}
            style={{
              maxWidth: '200px',
              textAlign: 'center',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '10px',
            }}
          >
            <Image
              src={member.image}
              alt={member.name}
              width={924}
              height={1087}
              style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '10px' }}
            />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>{member.name}</h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>{member.role}</p>

            {/* Social Links */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              {member.socialLinks.facebook && (
                <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook" style={{ color: '#4267B2', fontSize: '16px' }}></i>
                </a>
              )}
              {member.socialLinks.twitter && (
                <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter" style={{ color: '#1DA1F2', fontSize: '16px' }}></i>
                </a>
              )}
              {member.socialLinks.linkedin && (
                <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin" style={{ color: '#0077B5', fontSize: '16px' }}></i>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>

  );
};

export default TeamSection;
