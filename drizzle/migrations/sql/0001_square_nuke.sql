CREATE TABLE `user` (
	`username` text PRIMARY KEY NOT NULL,
	`passwordHash` text NOT NULL,
	`salt` text NOT NULL,
	`isAdmin` integer DEFAULT false,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP
);
