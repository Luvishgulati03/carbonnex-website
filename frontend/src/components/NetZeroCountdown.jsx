import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './NetZeroCountdown.css';

const NetZeroCountdown = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function calculateTimeLeft() {
        const targetDate = new Date('2050-01-01T00:00:00Z').getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        let timeLeft = {};

        if (difference > 0) {
            const daysInYear = 365.25; // Accounting for leap years roughly
            const msPerDay = 1000 * 60 * 60 * 24;

            const totalDays = Math.floor(difference / msPerDay);
            const years = Math.floor(totalDays / daysInYear);
            const days = Math.floor(totalDays % daysInYear);

            timeLeft = {
                years: years,
                days: days,
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60)
            };
        } else {
            timeLeft = { years: 0, days: 0, hours: 0, minutes: 0 };
        }

        return timeLeft;
    }

    const formatNumber = (num) => {
        return num.toString().padStart(2, '0');
    };

    return (
        <motion.div
            className="net-zero-countdown-container"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
            <div className="net-zero-countdown">
                <div className="countdown-header">
                    <span className="scrolling-dot"></span>
                    <span className="countdown-title">NET ZERO TARGET</span>
                </div>
                <div className="countdown-timer">
                    <div className="time-block">
                        <span className="time-value glowing-text">{timeLeft.years}</span>
                        <span className="time-label">YRS</span>
                    </div>
                    <span className="time-separator">:</span>
                    <div className="time-block">
                        <span className="time-value glowing-text">{formatNumber(timeLeft.days)}</span>
                        <span className="time-label">DAYS</span>
                    </div>
                    <span className="time-separator">:</span>
                    <div className="time-block">
                        <span className="time-value glowing-text">{formatNumber(timeLeft.hours)}</span>
                        <span className="time-label">HRS</span>
                    </div>
                    <span className="time-separator">:</span>
                    <div className="time-block">
                        <span className="time-value glowing-text">{formatNumber(timeLeft.minutes)}</span>
                        <span className="time-label">MIN</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default NetZeroCountdown;
