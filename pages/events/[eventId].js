import { Fragment } from 'react';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import Head from 'next/head';
import Comments from '../../components/input/comments';

const EventDetailPage = ({ event }) => {
  if (!event) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
};

export default EventDetailPage;

export async function getStaticProps(context) {
  const { eventId } = context.params;
  const event = await getEventById(eventId);

  if (!event) return { notFound: true };

  return {
    props: {
      event,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  // Pre-generate only for featured events
  // and non-featured events get generated after a request has been sent
  const featuredEvent = await getFeaturedEvents();
  const paths = featuredEvent.map(event => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: true,
  };
}
