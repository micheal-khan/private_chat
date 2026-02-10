import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const ANIMALS = [
  "wolf",
  "halk",
  "eagle",
  "tiger",
  "lion",
  "bear",
  "fox",
  "owl",
  "shark",
  "panther",
  "leopard",
  "falcon",
  "rhino",
  "bull",
  "cobra",
  "viper",
  "lynx",
  "jaguar",
  "coyote",
  "badger",
];

const STORAGE_KEYS = "chat_username";

const genrateUsername = () => {
  const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `anonymous_${word}-${nanoid(5)}`;
};
export const useUsername = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const main = () => {
      const stored = localStorage.getItem(STORAGE_KEYS);

      if (stored) {
        setUsername(stored);
        return;
      } else {
        const newUsername = genrateUsername();
        localStorage.setItem(STORAGE_KEYS, newUsername);
        setUsername(newUsername);
      }
    };
    main();
  }, []);

  return { username };
};
