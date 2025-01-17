import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

const Spinner = ({ loading }) => {
  if (!loading) return null;

  return (
    <div style={styles.overlay}>
      <span className='text-xs text-white'>Please Wait</span> <BeatLoader color="#4338ca" loading={loading} size={20} />
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent gray background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // High z-index
  },
};

export default Spinner;
