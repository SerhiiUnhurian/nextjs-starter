import EventList from '../../components/events/event-list';
import { getFilteredEvents } from '../../dummy-data';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

const FilteredEventsPage = () => {
  const router = useRouter();
  const filterData = router.query.slug;
  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const year = +filterData[0];
  const month = +filterData[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2020 ||
    month < 1 ||
    month > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({ year, month });
  const date = new Date(year, month - 1);

  return filteredEvents.length === 0 ? (
    <Fragment>
      <ErrorAlert>
        <p>No events found.</p>
      </ErrorAlert>
      <div className="center">
        <Button link="/events">Show All Events</Button>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
