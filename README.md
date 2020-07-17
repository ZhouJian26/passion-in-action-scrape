# Passion in Action | Scrape Project

> This is a simple project for personal learning about web development.  
> In particular, NextJS and AWS (S3, Lambda and CloudWatch)

The project consists of scrape data from the original website using a Lambda function hosted on AWS and then putting those data into an S3 bucket. The Lambda function is triggered periodically from CloudWatch.

The reasons behind not requesting on-demand data from the official website are:

1. Do not overload the source website
2. The data is not changing so fast, at most 1 times per week
3. Requesting data takes a lot of time, about 1.5 seconds because I'm also scraping the first grade nested data
