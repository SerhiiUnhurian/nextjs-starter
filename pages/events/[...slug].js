import EventList from '../../components/events/event-list';
import { Fragment } from 'react';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../helpers/api-util';

const FilteredEventsPage = ({
  isFilterInvalid,
  filteredEvents,
  eventsDate,
}) => {
  if (isFilterInvalid) {
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
  if (!filteredEvents) {
    return <p className="center">Loading...</p>;
  }

  const date = new Date(eventsDate.year, eventsDate.month - 1);

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

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const year = +slug[0];
  const month = +slug[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2020 ||
    month < 1 ||
    month > 12
  ) {
    return {
      props: {
        isFilterInvalid: true,
      },
      // Alternatively ether notFound or redirection can be used
      // notFound: true,
      // redirect: {
      //   destination: '/error',
      // },
    };
  }

  const filteredEvents = await getFilteredEvents({ year, month });

  return {
    props: {
      filteredEvents,
      eventsDate: { year, month },
    },
  };
}
