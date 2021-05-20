import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

const HomePage = ({ featuredEvents }) => {
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  // const response = await fetch(
  //   'https://next-starter-bc9e6-default-rtdb.europe-west1.firebasedatabase.app/events.json'
  // );
  // const data = await response.json();
  // if (!data) {
  //   return {
  //     notFound: true,
  //   };
  // }

  // const featuredEvents = [];

  // for (const [id, event] of Object.entries(data)) {
  //   if (event.isFeatured) {
  //     featuredEvents.push({
  //       id,
  //       ...event,
  //     });
  //   }
  // }

  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}
