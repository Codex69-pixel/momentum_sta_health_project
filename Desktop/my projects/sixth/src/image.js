import pic from './road project.jpg'; 
function picture() {
    
    return (
       <div>
                  <style>
                      {`
                      .profile-pic{
                          height: 200px;
                          aspect-Ratio: 1/1;
                          border-Radius: 50%;
                          object-Fit: cover;
                          }
                      `}
                  </style>
                  <div className='app5'>
                  <img className="profile-pic" src={pic} alt="User Portrait"/>
                  </div>
              </div>
    );
}
export default picture;

