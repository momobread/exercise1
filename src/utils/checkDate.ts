const isValidDate = (value: Date): boolean => {
  //사실상 value는 form 입력에서 나온 거여서 string이다 근데 usertype은 Date임
  //그래서 타입에러를 피하기 위해서 밑에서 toString을했다

  let date = value.toString();

  const year = parseInt(date.slice(0, 4), 10);
  //date객체는 월을 0부터 시작함으로 0~11까지
  const month = parseInt(date.slice(4, 6), 10) - 1;
  const day = parseInt(date.slice(6, 8), 10);

  const dateObject = new Date(year, month, day);

  //   Date 객체는 유효하지 않은 날짜를 입력받았을 때 자동으로 조정됩니다. 예를 들어, "2023-02-30"을 입력하면
  //Date 객체는 이를 "2023-03-02"로 변경합니다. 이런 특성을 활용하여 날짜의 유효성을 검사할 수 있습니다.
  //   const date1 = new Date(2024, 0, 32);
  //   console.log(date1.getFullYear());
  //   console.log(date1.getMonth());
  //   console.log(date1.getDate());
  return dateObject.getFullYear() === year && dateObject.getMonth() === month && dateObject.getDate() === day;
};

export default isValidDate;
