import {useRef, useEffect} from 'react';

export const usePrevious = (value) =>{
    const ref = useRef();
    useEffect(()=>{
        ref.current = value;
    }, [value]);


return ref.current;
};

export function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = String(hours).padStart(2,'0');
  const formattedMinutes = String(minutes).padStart(2,'0');
  const formattedSeconds = String(seconds).padStart(2,'0');

  const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return formattedTime;
}

export function generateRandomId(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

export function getCurrentDate() {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
  ];

  const currentDate = new Date();

  const day = dayNames[currentDate.getDay()];
  const month = monthNames[currentDate.getMonth()];
  const date = currentDate.getDate();

  const formattedDate = `${day}, ${month} ${date}`;
  return formattedDate;
}