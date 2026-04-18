-- WEB-EA / Webprogramozas 1 - Eloadas Beadando
-- Adatbazis sema + seed adatok
-- Nethely.hu phpMyAdmin felulethez keszult

DROP TABLE IF EXISTS filmek;

CREATE TABLE filmek (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cim VARCHAR(200) NOT NULL,
  rendezo VARCHAR(120) NOT NULL,
  ev INT NOT NULL,
  mufaj VARCHAR(60) NOT NULL,
  ertekeles DECIMAL(3,1) NOT NULL
) CHARSET=utf8mb4;

INSERT INTO filmek (cim, rendezo, ev, mufaj, ertekeles) VALUES
  ('Valami Amerika',       'Herendi Gabor',        2002, 'vigjatek',    8.2),
  ('Kontroll',             'Antal Nimrod',         2003, 'drama',       7.9),
  ('Liza, a rokatunder',   'Ujj Meszaros Karoly',  2015, 'fantasy',     7.5),
  ('Sose halunk meg',      'Koltai Robert',        1993, 'vigjatek',    8.0),
  ('A nagy fuzes',         'Palfi Gyorgy',         2006, 'drama',       7.3),
  ('Sing utca',            'John Carney',          2016, 'musical',     8.1),
  ('A gyuruk ura',         'Peter Jackson',        2001, 'fantasy',     8.8),
  ('Inception',            'Christopher Nolan',    2010, 'sci-fi',      8.8);
