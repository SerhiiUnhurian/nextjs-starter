import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import { getAllEvents } from '../../helpers/api-util';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const AllEventsPage = ({ allEvents }) => {
  const router = useRouter();

  const findEventHandler = (year, month) => {
    const eventPath = router.pathname + `/${year}/${month}`;
    router.push(eventPath);
  };

  return (
    <Fragment>
      <Head>
        <title>Search Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve."
        />
      </Head>
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
