import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { getEventById } from '../../dummy-data';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';

const EventDetailPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const event = getEventById(eventId);
  console.log(event);
  if (!event) {
    return <p>No event fount</p>;
  }

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default EventDetailPage;
