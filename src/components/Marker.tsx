import { Location } from '../types/location';

const Marker: React.FC<{ location: Location }> = ({ location }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: location.x,
        top: location.y,
        background: 'green',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        color: 'white',
        fontSize: '11px',
        textAlign: 'center',
      }}
    >
      {location.id}
    </div>
  );
};

export default Marker;
