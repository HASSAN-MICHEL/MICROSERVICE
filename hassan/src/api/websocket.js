export const setupWebSocket = (onMessage) => {
    const socket = new WebSocket(`ws://${window.location.host}`);
  
    socket.onopen = () => {
      console.log('Connecté au serveur WebSocket');
    };
  
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('Erreur parsing WebSocket message:', error);
      }
    };
  
    socket.onerror = (error) => {
      console.error('Erreur WebSocket:', error);
    };
  
    socket.onclose = () => {
      console.log('Déconnecté du serveur WebSocket');
    };
  
    return () => {
      socket.close();
    };
  };