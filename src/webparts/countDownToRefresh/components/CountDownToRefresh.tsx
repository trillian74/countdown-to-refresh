import * as React from 'react';
import styles from './CountDownToRefresh.module.scss';
import { ICountDownToRefreshProps } from './ICountDownToRefreshProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'CountDownToRefreshWebPartStrings';
import { useEffect } from 'react';
import { useState } from 'react';



export const CoundDownToRefresh: React.FunctionComponent<ICountDownToRefreshProps> = (props: ICountDownToRefreshProps) => {

  const getInitialData = (): number => {
    let initSetting: number = 0;
    if (props.minutes === 0) {
      initSetting = props.seconds;
      return initSetting;
    }
    if (props.minutes === 0 && props.seconds === 0) {
      return 60;
    }
    let minutsTOSeconds: number = props.minutes * 60;
    return minutsTOSeconds + props.seconds;

  };

  const [timeLeft, setTimeLeft] = useState<number>(getInitialData);
  const [doRefresh, setDoRefresh] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const [autostarted, setAutoStarted] = useState<boolean>(props.autostart);

  const timeLeftRef = React.useRef(timeLeft);
  timeLeftRef.current = timeLeft;

  const calculateTimeLeft = (input:number) => {
    setTimeLeft(input - 1);
    if (timeLeft === 0) {
      setDoRefresh(true);
    }
  };

  const handlePause = (e: any) => {
    if(!autostarted || autostarted===undefined)
    {
      setAutoStarted(true);
      setPause(false);
      calculateTimeLeft(timeLeftRef.current);
    }else{
      setPause(!pause);
    }

  };


  useEffect(() => {
    if (doRefresh) {
      window.location.reload();
    }
  }, [doRefresh]);

  useEffect(() => {
    if(autostarted){
      if (!pause) {
        setTimeout(() => {
          calculateTimeLeft(timeLeftRef.current);
        }, 1000);
      }
    }

  }, [timeLeft,autostarted,pause]);

  return (
    <div className={styles.countDownToRefresh} onClick={handlePause}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <p className={styles.subTitle}>{autostarted ?(pause ? strings.WaitLabel : timeLeft < 0 ? strings.NowLoabel : timeLeft): "Start"}</p>
            <p className={styles.title}>{strings.TitleFieldLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

