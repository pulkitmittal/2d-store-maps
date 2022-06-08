import { Location } from '../types/location';

const Robot: React.FC<{ location: Location }> = ({ location }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: location.x,
        top: location.y,
        background: 'blue',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        color: 'white',
        fontSize: '12px',
        lineHeight: 2,
        textAlign: 'center',
      }}
    >
      {location.id}
    </div>
  );
};

export default Robot;
