import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import { getAllEvents } from '../../helpers/api-util';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

const AllEventsPage = ({ allEvents }) => {
  const router = useRouter();

  const findEventHandler = (year, month) => {
    const eventPath = router.pathname + `/${year}/${month}`;
    router.push(eventPath);
  };

  return (
    <Fragment>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={allEvents} />
    </Fragment>
  );
};

export default AllEventsPage;

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      allEvents,
    },
    revalidate: 60,
  };
}
