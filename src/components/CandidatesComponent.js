import { doc, updateDoc } from 'firebase/firestore';
import CandidateCollection from '../firebase/collection/Candidates';
import VoterCollection from '../firebase/collection/Voter';
import GetVoter from '../hooks/getVoter';
import CandidatePictureComponent from './CandidatePictureComponent';
import * as Gi from 'react-icons/gi';
import * as Ri from 'react-icons/ri';
import { Link } from 'react-router-dom';

const CandidatesComponent = ({ candidate: { name, count, id, image }, setTrial, setError, setSuccess }) => {
  const { voter } = GetVoter();

  const voteHandler = (e, id, currentCount, name) => {
    e.preventDefault();

    const userList = [];
    voter.map((vote) => userList.push(vote));
    const currentToken = JSON.parse(localStorage.getItem('token')).token;
    const findUserByToken = userList.find((user) => user.token === currentToken);

    if (findUserByToken) {
      if (findUserByToken.status) {
        setTrial(true);
      } else {
        const candidateRef = doc(CandidateCollection, id);
        updateDoc(candidateRef, {
          count: currentCount + 1,
        });

        const voterRef = doc(VoterCollection, findUserByToken.id);
        updateDoc(voterRef, {
          status: true,
          candidate: name,
        });

        setSuccess(true);
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="px-4 justify-between flex flex-col items-center">
        <CandidatePictureComponent candidate={{ name, count, image }} />
        <div className="py-6 flex flex-col">
          <Link to={`/vote/${name.split(' ')[0].toLowerCase()}`} className="bg-secondary tracking-wider my-4 hover:bg-opacity-90 text-utils text-sm px-4 lg:px-6 py-2 rounded-lg font-semibold font-poppins uppercase">
            <div className="flex">
              <span className="font-poppins ">Visi</span>
              <span className="m-0.5">
                <Ri.RiFilePaperFill />
              </span>
            </div>
          </Link>
          <div>
            <button onClick={(e) => voteHandler(e, id, count, name)} className="bg-secondary tracking-wider  hover:bg-opacity-90 text-utils text-sm px-4 lg:px-6 py-2 rounded-lg font-semibold font-poppins uppercase">
              <div className="flex">
                <span className="font-poppins ">vote</span>
                <span className="m-0.5">
                  <Gi.GiVote />
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidatesComponent;
