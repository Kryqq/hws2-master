import React, { useState } from 'react';
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton';
import { restoreState } from '../hw06/localStorage/localStorage';
import s from './Clock.module.css';

function Clock() {
   const [timerId, setTimerId] = useState<number | undefined>(undefined);

   const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())));
   const [show, setShow] = useState<boolean>(false);

   const start = () => {
      const timerId = window.setInterval(() => {
         setDate(new Date());
      }, 1000);

      setTimerId(timerId);
   };

   const stop = () => {
      clearInterval(timerId);
      setTimerId(undefined);
   };

   const onMouseEnter = () => {
      setShow(true);
   };
   const onMouseLeave = () => {
      setShow(false);
   };
   const time = (value: number) => {
      return value < 10 ? '0' + value : value;
   };

   const stringTime = `${time(date.getHours())}:${time(date.getMinutes())}:${time(date.getSeconds())}` || <br />;
   const stringDate = `${time(date.getDate())}.${time(date.getMonth() + 1)}.${time(date.getFullYear())}` || <br />;

   const day = () => {
      const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return dayArray[date.getDay()];
   };
   const month = () => {
      const monthsArray = [
         'January',
         'February',
         'March',
         'April',
         'May',
         'June',
         'July',
         'August',
         'September',
         'October',
         'November',
         'December',
      ];
      return monthsArray[date.getMonth()];
   };
   const stringDay = day() || <br />;
   const stringMonth = month() || <br />;

   return (
      <div className={s.clock}>
         <div id={'hw9-watch'} className={s.watch} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <span id={'hw9-day'}>{stringDay}</span>,{' '}
            <span id={'hw9-time'}>
               <strong>{stringTime}</strong>
            </span>
         </div>

         <div id={'hw9-more'}>
            <div className={s.more}>
               {show ? (
                  <>
                     <span id={'hw9-month'}>{stringMonth}</span>, <span id={'hw9-date'}>{stringDate}</span>
                  </>
               ) : (
                  <>
                     <br />
                  </>
               )}
            </div>
         </div>

         <div className={s.buttonsContainer}>
            <SuperButton id={'hw9-button-start'} disabled={!!timerId} onClick={start}>
               start
            </SuperButton>
            <SuperButton id={'hw9-button-stop'} disabled={!timerId} onClick={stop}>
               stop
            </SuperButton>
         </div>
      </div>
   );
}

export default Clock;
