import React from 'react';

export default function getFormattedDate(dateString: string): string {
    return new Intl.DateTimeFormat('zh-TW', { dateStyle: 'long' }).format(new Date(dateString))
}