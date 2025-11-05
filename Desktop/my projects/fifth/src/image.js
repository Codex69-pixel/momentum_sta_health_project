import pic from './turtle bay.jpg'

function Userpic(){
    return(
        <div>
            <styles>
                {`
                .profile-pic{
                    height: "200px";
                    aspect-Ratio: "1/1";
                    border-Radius: "50%";
                    object-Fit: "cover";
                    }
                `}
            </styles>
            <div className='app5'>
            <img className='profile-pic' src={pic} alt="User Portrait"/>
            </div>
        </div>
    );
}
export default Userpic;