# MediCare 

MediCare is a simple healthcare website built with PHP, HTML, CSS, and MySQL. It features a contact form powered by PHPMailer and a backend that connects to a MySQL database for managing submissions.

##  Live Site

 [https://medicare-yqn9.onrender.com/](https://medicare-yqn9.onrender.com/)


##  Tech Stack

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: PHP  
- **Database**: MySQL  
- **Mailer**: PHPMailer (SMTP support)  

---

##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Justice00000/medi-care.git
cd medi-care
```
## 2. Set Up the Database

- Import the SQL schema from `database/medicare.sql` into your MySQL server using phpMyAdmin or the MySQL CLI:
  ```bash
  mysql -u your_username -p your_database < database/medicare.sql

Update your database connection settings (e.g., host, username, password, database name) inside contact.php.

## 3. Configure PHPMailer

- Open `contact.php` and locate the PHPMailer configuration section.
- Set your SMTP credentials:
  - SMTP host (e.g., smtp.gmail.com)
  - Port (e.g., 587 for TLS)
  - SMTP username (your email address)
  - SMTP password (your app password or SMTP key)
- Choose your SMTP provider (e.g., Gmail, Mailtrap, SendGrid).
- Make sure less secure app access is enabled if using Gmail (or use an app password).

---

## 4. Deploy

You can deploy the project using:

- **Render**  
  👉 [Render](https://render.com)

- **Local Hosting Options**:
  - [XAMPP](https://www.apachefriends.org/) – For Windows/Linux/Mac
  - [WAMP](http://www.wampserver.com/) – For Windows
  - [MAMP](https://www.mamp.info/) – For macOS

> After deploying, ensure your PHP server has `mail()` enabled or use SMTP authentication.
