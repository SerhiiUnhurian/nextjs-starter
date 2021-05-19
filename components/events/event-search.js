import Button from '../ui/button';
import cls from './event-search.module.css';

const EventSearch = ({ onSearch }) => {
  const submitHandler = e => {
    e.preventDefault();
    const {
      year: { value: selectedYear },
      month: { value: selecteMonth },
    } = e.target.elements;

    onSearch(selectedYear, selecteMonth);
  };

  return (
    <form className={cls.form} onSubmit={submitHandler}>
      <div className={cls.controls}>
        <div className={cls.control}>
          <label htmlFor="year">Year</label>
          <select id="year">
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={cls.control}>
          <label htmlFor="month">Month</label>
          <select id="month">
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <Button onClick={() => {}}>Search Events</Button>
    </form>
  );
};

export default EventSearch;
