<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
Sessions allow a server to store data about a client, which in turn let's the user have uninterrupted access without having to continually provide authentication information.

2. What does bcrypt do to help us store passwords in a secure manner.
Bcrypt generates salts as well as allows for us to manually provide a salt as well, it also hashes passwords in multiple rounds.

3. What does bcrypt do to slow down attackers?
If you have a hashed password an attacker would need to have the hash, know the algorithm used to create the hash, and how many rounds where used to create the hash.

4. What are the three parts of the JSON Web Token?
The three parts of a JWT are header, payload, and signature. The header contains the type of token and the algorithm used. The payload contains the claims (mainly data about the user and issuer of the token). The signature contains the encoded header and the encoded payload plus an encoded secret.