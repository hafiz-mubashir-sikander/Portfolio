/* ==========================================================================
   Portfolio data — single source of truth.
   Edit these arrays to change content. Every count, filter and stat on the
   site is derived from them (nothing is hard-coded elsewhere).
   ========================================================================== */

/* Contact configuration ---------------------------------------------------
   FORM_ENDPOINT : paste your Formspree URL, e.g. https://formspree.io/f/xxxxxxxx
                   While empty, the form never pretends to send; it points
                   visitors to LinkedIn instead.
   CONTACT_EMAIL : optional public email. While empty, the "copy email" actions
                   are hidden automatically.                                  */
window.FORM_ENDPOINT = "";
window.CONTACT_EMAIL = "";

window.LINKS = {
  linkedin: "https://www.linkedin.com/in/hafiz-mubashir-sikander",
  github: "https://github.com/hafiz-mubashir-sikander"
};

/* Facts used for calculated values (verified from LinkedIn) */
window.FACTS = {
  careerStart: [2025, 4],          // Apr 2025 — Flutter internship at VirtueNetz
  location: "Rahim Yar Khan, Punjab, Pakistan",
  timeZone: "Asia/Karachi",
  connections: "500+"
};

/* Projects ---------------------------------------------------------------
   c   : categories (mobile | games | ai | pro | personal)
   ft  : featured on the premium showcase
   l   : links as [label, url]
   plat: "android" | "ios" | "both" | "private" — drives the "live on stores" stat */
window.P = [
  {
    id: "meteredo", n: "Meteredo", ft: true, plat: "android", form: "phone",
    c: ["mobile", "personal"], cat: "Mobile app · Personal product", ac: "#06D6F0",
    st: "Published on Google Play", role: "Founder and developer",
    d: "Smart electricity meter and reading management for everyday life.",
    t: ["Flutter", "Dart", "Firebase", "Firestore", "Cloud Functions", "Cloudinary", "Google Generative AI"],
    why: "Electricity bills arrive late and say little about when or how power was used. Notebooks and spreadsheets get lost, households with several meters have no single view, and family members have no shared tool.",
    sol: "Meteredo lets you record readings on demand, calculates units used since the last entry, and keeps every meter, reading and bill in one cloud-synced place. A camera can read the meter digits with AI, and you always confirm the value before it is saved.",
    f: ["Multiple meters per account, with photos and billing details", "Manual or AI-assisted camera readings, reviewed before saving", "Bill records with due date, payment status and photos", "Family groups joined by invite code, synced in real time", "Google sign-in, email login and biometric unlock", "Push notifications; English and Roman Urdu"],
    l: [["Google Play", "https://play.google.com/store/apps/details?id=com.meteredo.app"], ["Website", "https://meteredo-app.web.app"], ["Intro video", "https://youtu.be/3_w6V1lkulQ"], ["Privacy policy", "https://meteredo-app.web.app/privacy-policy.html"], ["GitHub docs", "https://github.com/hafiz-mubashir-sikander/meteredo-app"]],
    note: "Android only for now. The app source is private."
  },

  {
    id: "hairalize", n: "Hairalize", ft: true, plat: "private", form: "phone",
    c: ["ai", "personal"], cat: "AI · Healthcare · Final year project", ac: "#EC4899",
    st: "Award winner, 2026", role: "Co-founder and development team member",
    d: "AI-powered alopecia detection and stage classification for preliminary hair-loss screening.",
    t: ["AI / image classification", "Mobile app", "Multilingual UI"],
    why: "Preliminary hair-loss screening is hard to reach for many people.",
    sol: "Hairalize classifies the stage of alopecia from an image and presents the result as a personalised report, so people can understand where they stand before seeing a doctor.",
    f: ["Image-based alopecia screening", "Severity stage classification", "Personalised reports and scan history", "Doctor appointment functionality", "Multilingual support"],
    l: [],
    note: "A team project built with my KFUEIT classmates, including Ali Raza. I worked on the application development; I don’t claim the machine learning model as my own work. First position at KFUEIT Project Expo 2026."
  },

  {
    id: "shards", n: "Shards Of Light", ft: true, plat: "android", form: "wide",
    c: ["games", "pro"], cat: "Unity 2D game · VirtueNetz", ac: "#F59E0B",
    st: "Published on Google Play", role: "Game developer at VirtueNetz",
    d: "Story-driven offline 2D platformer. Rubi, guardian of a magic crystal, travels frozen worlds to recover its shards.",
    t: ["Unity 6", "C#", "URP 2D", "Cinemachine", "Timeline", "AdMob"],
    why: "Rubi guards a crystal whose light keeps the world warm. When enemies shatter it, the world begins to fade.",
    sol: "Seven levels of touch-first platforming across frozen lands, ending in a final boss fight. It runs fully offline with local saves and no account.",
    f: ["Run, jump, climb ladders and swing on ropes", "Seven levels with three-star scoring", "Traps, moving platforms, box puzzles and varied enemies", "Multi-phase boss encounters", "Timeline and Cinemachine cutscenes", "Audio, settings and Android optimisation"],
    l: [["Google Play", "https://play.google.com/store/apps/details?id=com.virtuenetz.shardsoflight"], ["Website", "https://shards-of-light.vercel.app/"], ["GitHub", "https://github.com/hafiz-mubashir-sikander/shards-of-light"]],
    note: "I did the gameplay programming, level implementation, UI and Android release, and generated about 30–40% of the assets. Some music and art is sourced externally."
  },

  {
    id: "unitedceres", n: "United Ceres", ft: false, plat: "both", form: "phone",
    c: ["mobile", "pro"], cat: "Mobile app · Client project", ac: "#10B981",
    st: "Published on Android and iOS", role: "Solo Flutter developer at VirtueNetz",
    d: "Student app for United Ceres College with timetables, attendance, results, invoices and announcements.",
    t: ["Flutter", "Dart", "GetX", "Dio", "Socket.IO", "Firebase", "Secure Storage", "Local Auth"],
    why: "Students needed one place on their phone for academic and college services.",
    sol: "I built the whole mobile app against the college’s existing ERP and APIs, then took it through store release on both platforms.",
    f: ["Profile, timetable, attendance and assessment results", "Invoices, receipts and PDF documents", "Announcements, notifications and helpdesk", "Secure login with biometric authentication", "Local storage and state handling"],
    l: [["Google Play", "https://play.google.com/store/apps/details?id=sg.edu.unitedceres.app"], ["App Store", "https://apps.apple.com/pk/app/united-ceres/id6761606105"], ["GitHub", "https://github.com/hafiz-mubashir-sikander/unitedceres-app"]],
    note: "The ERP backend was provided by the client. Production source is private."
  },

  {
    id: "technician", n: "Technician ID", ft: false, plat: "private", form: "phone",
    c: ["mobile", "pro"], cat: "Mobile app · Client project", ac: "#3B82F6",
    st: "Delivered to client", role: "Flutter frontend developer at VirtueNetz",
    d: "Offline-first Flutter app for technician workflows, delivered directly to the client.",
    t: ["Flutter", "Dart", "REST APIs", "Local storage", "State management"],
    why: "Technicians need their workflows to keep working when connectivity drops.",
    sol: "I built the Flutter frontend so key screens work from local data and sync with the backend team’s REST APIs on reconnect.",
    f: ["Offline-first behaviour with local persistence", "REST API integration and data mapping", "Forms, validation and error recovery states"],
    l: [["GitHub", "https://github.com/hafiz-mubashir-sikander/technician-id-app"]],
    note: "Not listed on any app store because public distribution wasn’t requested. Backend APIs came from the backend team."
  },

  {
    id: "nkcc", n: "NKCC", ft: false, plat: "private", form: "phone",
    c: ["mobile", "pro"], cat: "Mobile app · Client project", ac: "#EF4444",
    st: "Delivered to client", role: "Flutter UI developer and audio feature developer at VirtueNetz",
    d: "Cross-platform workforce management app for Android and iOS, with dedicated Employee, Supervisor and HR interfaces, attendance, leave requests and voice recording.",
    t: ["Flutter", "Dart", "GetX", "Firebase", "REST APIs", "Node.js (backend)", "Audio Waveforms", "Flutter ScreenUtil"],
    why: "Organisations need one place to manage attendance, leave and overtime requests, approvals, assets and documents, with a separate experience for employees, supervisors and HR administrators.",
    sol: "NKCC is an enterprise workforce management app built with Flutter for Android and iOS. It covers attendance tracking, leave and overtime requests, supervisor approvals, employee management, asset management, digital wallets and document management, with a dedicated interface for each of the three roles.",
    f: ["Employee, Supervisor and HR role-based interfaces", "Attendance management and history", "Leave and overtime requests", "Supervisor approval workflows", "Employee administration", "Asset management", "Digital wallet and documents", "Interactive voice recording and playback", "Audio waveform visualisation"],
    l: [["Figma design", "https://www.figma.com/design/Bt07jfpHXICRT5eZ3cOZeV/NKCC-App--Copy-"]],
    note: "I designed and built the responsive Flutter interfaces for the Employee, Supervisor and HR modules, implemented voice recording with waveform visualisation, pause and resume, playback and recording controls, and fixed UI and functional issues found during QA. Backend integration was handled by another developer at VirtueNetz. Delivered privately to the client, so there are no store listings and the source is private."
  }
];

/* Filter labels (keys match project categories) */
window.F = [["all", "All"], ["mobile", "Mobile Apps"], ["games", "Games"], ["ai", "AI"], ["pro", "Professional"], ["personal", "Personal"]];

/* Skills: [category, [skills], note, icon] — only skills from the source data */
window.SK = [
  ["Mobile", ["Flutter", "Dart", "GetX", "Riverpod", "BLoC", "REST APIs"], "Flutter apps shipped to Android and iOS", "smartphone"],
  ["Games", ["Unity", "C#", "2D gameplay", "Cinemachine", "Timeline"], "Shards Of Light, released on Google Play", "gamepad"],
  ["Backend & data", ["Firebase", "Firestore", "Firebase Auth", "Cloud Functions", "MySQL", "Cloudinary"], "Meteredo and VirtueNetz apps", "database"],
  ["Languages", ["Dart", "C#", "Java", "C++"], "From coursework and projects", "code"],
  ["Workflow", ["Git", "GitHub", "Android development"], "Version control and team delivery", "git"]
];

/* Recommendations (full text as published on LinkedIn) */
window.Q = [
  {
    n: "Muhammad Zubair", r: "Senior Mobile App Developer (Flutter & React Native)", rel: "Mentor at VirtueNetz · July-Nov 2026",
    t: ["I had the pleasure of working with Hafiz Mubashir at VirtueNetz. He is a dedicated Flutter Developer with strong problem-solving skills, a positive attitude, and a willingness to learn.",
      "His teamwork, commitment, and continuous improvement make him a valuable team member. I highly recommend him and wish him continued success in his career.",]
  },
  {
    n: "Amir Nazir", r: "Senior Mobile App Developer (Flutter & React Native)", rel: "Mentor at VirtueNetz · July-Nov 2026",
    t: ["I’ve had the pleasure of working with Hafiz Mubashir Sikandar at VirtueNetz and watching him grow from an intern into a skilled Flutter Developer.",
      "He is a dedicated professional who takes ownership of his work, demonstrates strong problem-solving skills, and approaches challenges with a positive attitude. His commitment to quality, willingness to learn, and collaborative spirit make him a valued team member.",
      "I’m confident he will continue to grow and would highly recommend him to any team looking for a responsible and motivated developer."]
  },
  {
    n: "Ali Raza", r: "IT Support & System Administration", rel: "Classmate and Hairalize teammate · Present",
    t: ["I had the opportunity to work with Hafiz Mubashir throughout our university journey, especially as teammates on our Final Year Project, Hairalize.",
      "Mubashir played a key role in developing the application, showing strong app development skills and a practical approach to solving technical challenges. What I appreciated most was his sense of responsibility, problem-solving abilities, and willingness to support teammates whenever needed.",
      "His dedication to improving his skills and working on his own product also reflects his passion for development. I enjoyed working with him and would highly recommend him for opportunities in software and app development."]
  }
];

/* Rotating hero roles */
window.ROLES = ["Flutter Developer", "Mobile App Developer", "Game Developer", "Software Engineer", "Product Founder"];

/* Project media ---------------------------------------------------------
   d    : folder in assets/projects/ (icon.png, thumb-600/900/1200.webp, shots/)
   k    : screenshot shape (phone | tablet | wide) — sets the gallery tile height
   s    : screenshots as [file, width, height, caption]. Files are pre-sized, so
          add a new image to the folder, then add one line here.                */
window.PM = {
  hairalize: {
    d: "assets/projects/hairalize/", k: "phone", s: [
      ["01.webp", 426, 900, "Sign in"],
      ["02.webp", 426, 900, "Role selection"],
      ["03.webp", 426, 900, "Patient dashboard"],
      ["04.webp", 426, 900, "Doctor dashboard"],
      ["05.webp", 426, 900, "Patients list"],
      ["06.webp", 426, 900, "Doctors list"],
      ["07.webp", 426, 900, "Appointments"],
      ["08.webp", 426, 900, "AI scan reports"],
      ["09.webp", 426, 900, "Subscription plan details"]
    ]
  },
  meteredo: {
    d: "assets/projects/meteredo/", k: "phone", s: [
      ["01.webp", 506, 900, "Meteredo app overview"],
      ["02.webp", 506, 900, "Manage all your meters"],
      ["03.webp", 506, 900, "Capture a meter reading"],
      ["04.webp", 506, 900, "Save readings easily"],
      ["05.webp", 506, 900, "Reading details"],
      ["06.webp", 506, 900, "View bills online"],
      ["07.webp", 506, 900, "Share meters with family"]
    ]
  },
  shards: {
    d: "assets/projects/shards/", k: "wide", s: [
      ["01.webp", 1500, 655, "Gameplay, level scene 1"],
      ["02.webp", 1500, 659, "Gameplay, level scene 2"],
      ["03.webp", 1500, 659, "Gameplay, level scene 3"],
      ["04.webp", 1500, 659, "Gameplay, level scene 4"],
      ["05.webp", 1500, 661, "Gameplay, level scene 5"],
      ["06.webp", 1500, 657, "Gameplay, level scene 6"],
      ["07.webp", 1500, 657, "Gameplay, level scene 7"],
      ["08.webp", 1500, 655, "Gameplay, level scene 8"],
      ["09.webp", 1500, 659, "Gameplay, level scene 9"]
    ]
  },
  technician: {
    d: "assets/projects/technician/", k: "tablet", s: [
      ["01.webp", 834, 1194, "Splash screen"],
      ["02.webp", 834, 1194, "Login screen"],
      ["03.webp", 834, 1194, "Dashboard"],
      ["04.webp", 834, 1194, "Scan horse tag"],
      ["05.webp", 834, 1295, "Scanned horse tag details"],
      ["06.webp", 834, 1353, "Assigned horse list"],
      ["07.webp", 834, 1194, "Survey form"],
      ["08.webp", 834, 1361, "Marking identification"],
      ["09.webp", 834, 2428, "Head markings"],
      ["10.webp", 834, 1498, "Leg markings"],
      ["11.webp", 834, 1161, "Submit markings"],
      ["12.webp", 834, 1625, "Survey rejected"]
    ]
  },
  unitedceres: {
    d: "assets/projects/unitedceres/", k: "phone", s: [
      ["01.webp", 303, 658, "Bulletins and announcements"],
      ["02.webp", 296, 647, "My profile"],
      ["03.webp", 297, 635, "Helpdesk tickets"],
      ["04.webp", 303, 648, "Module classes"],
      ["05.webp", 301, 652, "Invoices and charges"],
      ["06.webp", 306, 657, "Timetable"],
      ["07.webp", 298, 657, "Student attendance"],
      ["08.webp", 300, 661, "Academic details"]
    ]
  },
  nkcc: {
    d: "assets/projects/nkcc/", k: "phone", s: [
      ["01.webp", 414, 900, "Splash screen"],
      ["02.webp", 414, 900, "Sign in"],
      ["03.webp", 414, 900, "Attendance dashboard"],
      ["04.webp", 414, 900, "My assigned assets"],
      ["05.webp", 414, 900, "Assigned asset details"],
      ["06.webp", 414, 900, "Request an asset"],
      ["07.webp", 414, 900, "Requestable asset details"],
      ["08.webp", 414, 900, "Return an asset"],
      ["09.webp", 414, 900, "Pending requests"],
      ["10.webp", 450, 1160, "Request details with voice message"],
      ["11.webp", 414, 900, "Reason with voice option"],
      ["12.webp", 414, 900, "Recording a voice message"],
      ["13.webp", 414, 900, "Voice message added"],
      ["14.webp", 414, 900, "Upload a document"],
      ["15.webp", 414, 900, "Digital wallet"],
      ["16.webp", 414, 900, "User settings"]
    ]
  }
};
