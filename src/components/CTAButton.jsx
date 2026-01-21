import React from 'react';
import { motion } from 'framer-motion';
import './CTAButton.css';

const CTAButton = ({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    href,
    disabled = false,
    loading = false,
    icon,
    className = ''
}) => {
    const ButtonComponent = href ? motion.a : motion.button;

    const buttonProps = href
        ? { href, target: href.startsWith('http') ? '_blank' : undefined }
        : { onClick, disabled: disabled || loading, type: 'button' };

    return (
        <ButtonComponent
            className={`cta-button cta-button--${variant} cta-button--${size} ${className}`}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            {...buttonProps}
        >
            {loading && <span className="cta-button__spinner"></span>}
            {icon && !loading && <span className="cta-button__icon">{icon}</span>}
            <span className="cta-button__text">{children}</span>
        </ButtonComponent>
    );
};

export default CTAButton;
