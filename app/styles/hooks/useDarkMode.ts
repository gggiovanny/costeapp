import { useLocalStorage } from '@mantine/hooks';

export default function () {
  const [isDarkModeOn, setIsDarkModeOn] = useLocalStorage<boolean>({
    key: 'is-dark-mode-on',
    defaultValue: false,
  });

  function toggleDarkMode() {
    setIsDarkModeOn(!isDarkModeOn);
  }

  return { isDarkModeOn, toggleDarkMode };
}
