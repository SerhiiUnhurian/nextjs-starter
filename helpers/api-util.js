export async function getAllEvents() {
  const response = await fetch(
    'https://next-starter-bc9e6-default-rtdb.europe-west1.firebasedatabase.app/events.json'
  );
  const data = await response.json();
  const allEvents = [];

  for (const [id, event] of Object.entries(data)) {
    allEvents.push({
      id,
      ...event,
    });
  }

  return allEvents;
}

export async function getFeaturedEvents() {
  const events = await getAllEvents();
  return events.filter(event => event.isFeatured);
}

export async function getEventById(id) {
  const events = await getAllEvents();
  return events.find(event => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const events = await getAllEvents();

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
