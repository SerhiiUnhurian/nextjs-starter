import EventList from '../../components/events/event-list';
import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

const FilteredEventsPage = () => {
  const [events, setEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;

  const { data: allEvents, error } = useSWR(
    'https://next-starter-bc9e6-default-rtdb.europe-west1.firebasedatabase.app/events.json'
  );

  useEffect(() => {
    if (allEvents) {
      const filteredEvents = [];

      for (const [id, event] of Object.entries(allEvents)) {
        filteredEvents.push({
          id,
          ...event,
        });
      }

      setEvents(filteredEvents);
    }
  }, [allEvents]);

  if (!events) {
    return <p className="center">Loading...</p>;
  }

  const year = +filterData[0];
  const month = +filterData[1];

  if (
    error ||
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

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

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
