import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

const AllEventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  const findEventHandler = (year, month) => {
    const eventPath = router.pathname + `/${year}/${month}`;
    router.push(eventPath);
  };

  return (
    <Fragment>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default AllEventsPage;
