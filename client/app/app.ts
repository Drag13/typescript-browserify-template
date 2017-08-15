import { Timer, ServerTimeProvider } from './Timer';

const timerElementId = 'timer';
const timerContainer = document.getElementById(timerElementId);

if (!timerContainer) {
    throw new Error(`Element with id ${timerElementId} not found. Application stopped.`);
}

const timerProvider = new ServerTimeProvider();
const timer = new Timer(timerContainer, timerProvider);
timer.run();

