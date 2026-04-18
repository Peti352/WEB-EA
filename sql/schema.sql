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
  ('Valami Amerika',       'Herendi Gábor',        2002, 'vígjáték', 8.2),
  ('Kontroll',             'Antal Nimród',         2003, 'dráma',    7.9),
  ('Liza, a rókatündér',   'Ujj-Mészáros Károly',  2015, 'fantasy',  7.5),
  ('Sose halunk meg',      'Koltai Róbert',        1993, 'vígjáték', 8.0),
  ('Taxidermia',           'Pálfi György',         2006, 'dráma',    7.3),
  ('Sing Street',          'John Carney',          2016, 'musical',  8.1),
  ('A Gyűrűk Ura',         'Peter Jackson',        2001, 'fantasy',  8.8),
  ('Inception',            'Christopher Nolan',    2010, 'sci-fi',   8.8);
