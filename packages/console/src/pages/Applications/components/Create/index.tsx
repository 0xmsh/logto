import React, { SVGProps } from 'react';

import Card from '@/components/Card';
import CardTitle from '@/components/CardTitle';

import * as styles from './index.module.scss';

const Close = (props: SVGProps<SVGSVGElement>) => (
  <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M7.05727 7.05703C7.57797 6.53633 8.42219 6.53633 8.94289 7.05703L16.0001 14.1142L23.0573 7.05703C23.578 6.53633 24.4222 6.53633 24.9429 7.05703C25.4636 7.57773 25.4636 8.42195 24.9429 8.94265L17.8857 15.9998L24.9429 23.057C25.4636 23.5777 25.4636 24.4219 24.9429 24.9426C24.4222 25.4633 23.578 25.4633 23.0573 24.9426L16.0001 17.8855L8.94289 24.9426C8.42219 25.4633 7.57797 25.4633 7.05727 24.9426C6.53657 24.4219 6.53657 23.5777 7.05727 23.057L14.1145 15.9998L7.05727 8.94265C6.53657 8.42195 6.53657 7.57773 7.05727 7.05703Z"
      fill="#333333"
    />
  </svg>
);

type Props = {
  onClose?: () => void;
};

const Create = ({ onClose }: Props) => {
  return (
    <Card className={styles.card}>
      <div className={styles.headline}>
        <CardTitle title="applications.create" subtitle="applications.subtitle" />
        <Close onClick={onClose} />
      </div>
    </Card>
  );
};

export default Create;
