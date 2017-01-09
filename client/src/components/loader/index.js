import React from 'react';

import styles from './loaderStyles.css';

const Loader = () => (
  <div className={styles.loader}>
    <svg className={styles.circular} viewBox="25 25 50 50">
      <circle className={styles.spinnerCircle} cx="50" cy="50" r="20" fill="none" strokeWidth="3" strokeMiterlimit="10" />
    </svg>
  </div>
);

export default Loader;
