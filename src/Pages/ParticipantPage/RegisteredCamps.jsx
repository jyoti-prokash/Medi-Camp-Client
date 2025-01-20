import useParticipantsCamps from '../../Hooks/useParticipantsCamps';

const RegisteredCamps = () => {
    const [registeredCamps] = useParticipantsCamps();
    return (
        <div>
            <h2>registered camp {registeredCamps.length}</h2>
        </div>
    );
};

export default RegisteredCamps;