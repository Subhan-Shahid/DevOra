// Animated Dashboard Showcase Component
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';

export const AnimatedDashboardShowcase = ({ theme }) => {
    return (
        <Grid container spacing={2}>
            {/* Animated Bar Chart */}
            <Grid size={{ xs: 12, sm: 6 }}>
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    animate={{
                        y: [0, -10, 0],
                        rotateX: [0, 2, 0],
                        rotateY: [0, -2, 0]
                    }}
                    whileHover={{
                        scale: 1.05,
                        rotateX: 5,
                        rotateY: -5,
                        transition: { duration: 0.3 }
                    }}
                    style={{
                        perspective: '1000px',
                        transformStyle: 'preserve-3d'
                    }}
                    sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: theme.palette.mode === 'dark'
                            ? '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(14,165,233,0.3)'
                            : '0 25px 60px rgba(14,165,233,0.2), 0 8px 24px rgba(0,0,0,0.1)',
                        border: theme.palette.mode === 'dark'
                            ? '2px solid rgba(14,165,233,0.4)'
                            : '2px solid rgba(14,165,233,0.3)',
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.98))'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98))',
                        width: { xs: '85%', sm: '100%' },
                        mx: 'auto',
                        p: 3,
                        minHeight: 280,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 30px 70px rgba(0,0,0,0.6), 0 0 60px rgba(14,165,233,0.5)'
                                : '0 30px 70px rgba(14,165,233,0.3), 0 12px 32px rgba(14,165,233,0.1)',
                        }
                    }}
                >
                    {/* Animated glow border */}
                    <Box
                        component={motion.div}
                        animate={{
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        sx={{
                            position: 'absolute',
                            inset: -2,
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(14,165,233,0.6), rgba(56,189,248,0.3))'
                                : 'linear-gradient(135deg, rgba(56,189,248,0.4), rgba(14,165,233,0.2))',
                            filter: 'blur(8px)',
                            zIndex: -1,
                            borderRadius: 4
                        }}
                    />

                    {/* Chart Title */}
                    <Typography variant="caption" sx={{
                        color: theme.palette.mode === 'dark' ? '#bae6fd' : '#0369a1',
                        mb: 2,
                        display: 'block',
                        fontWeight: 600
                    }}>
                        Monthly Revenue
                    </Typography>

                    {/* Animated Bars */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 180, justifyContent: 'space-around' }}>
                        {[65, 85, 70, 95, 80, 90].map((height, idx) => (
                            <Box
                                key={idx}
                                component={motion.div}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${height}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                                sx={{
                                    flex: 1,
                                    borderRadius: '8px 8px 0 0',
                                    background: `linear-gradient(180deg, rgba(14,165,233,${0.8 + idx * 0.05}), rgba(56,189,248,${0.6 + idx * 0.05}))`,
                                    boxShadow: '0 -4px 12px rgba(14,165,233,0.3)',
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '4px',
                                        background: 'rgba(255,255,255,0.5)',
                                        borderRadius: '8px 8px 0 0'
                                    }
                                }}
                            />
                        ))}
                    </Box>

                    {/* X-axis labels */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 1 }}>
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, idx) => (
                            <Typography key={idx} variant="caption" sx={{
                                color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
                                fontSize: '0.65rem',
                                flex: 1,
                                textAlign: 'center'
                            }}>
                                {month}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Grid>

            {/* Animated Donut Chart */}
            <Grid size={{ xs: 12, sm: 6 }}>
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    animate={{
                        y: [0, -12, 0],
                        rotateX: [0, -2, 0],
                        rotateY: [0, 2, 0]
                    }}
                    whileHover={{
                        scale: 1.05,
                        rotateX: -5,
                        rotateY: 5,
                        transition: { duration: 0.3 }
                    }}
                    style={{
                        perspective: '1000px',
                        transformStyle: 'preserve-3d'
                    }}
                    sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: theme.palette.mode === 'dark'
                            ? '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(14,165,233,0.3)'
                            : '0 25px 60px rgba(14,165,233,0.2), 0 8px 24px rgba(0,0,0,0.1)',
                        border: theme.palette.mode === 'dark'
                            ? '2px solid rgba(14,165,233,0.4)'
                            : '2px solid rgba(14,165,233,0.3)',
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.98))'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98))',
                        width: { xs: '85%', sm: '100%' },
                        mx: 'auto',
                        p: 3,
                        minHeight: 280,
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 30px 70px rgba(0,0,0,0.6), 0 0 60px rgba(14,165,233,0.5)'
                                : '0 30px 70px rgba(14,165,233,0.3), 0 12px 32px rgba(14,165,233,0.1)',
                        }
                    }}
                >
                    {/* Animated glow border */}
                    <Box
                        component={motion.div}
                        animate={{
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        sx={{
                            position: 'absolute',
                            inset: -2,
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(14,165,233,0.6), rgba(56,189,248,0.3))'
                                : 'linear-gradient(135deg, rgba(56,189,248,0.4), rgba(14,165,233,0.2))',
                            filter: 'blur(8px)',
                            zIndex: -1,
                            borderRadius: 4
                        }}
                    />

                    {/* Chart Title */}
                    <Typography variant="caption" sx={{
                        color: theme.palette.mode === 'dark' ? '#bae6fd' : '#0369a1',
                        mb: 2,
                        fontWeight: 600
                    }}>
                        User Distribution
                    </Typography>

                    {/* Donut Chart */}
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <Box
                            component={motion.div}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            sx={{
                                width: 140,
                                height: 140,
                                borderRadius: '50%',
                                background: `conic-gradient(
                  from 0deg,
                  rgba(14,165,233,0.9) 0deg 120deg,
                  rgba(56,189,248,0.8) 120deg 240deg,
                  rgba(125,211,252,0.7) 240deg 300deg,
                  rgba(186,230,253,0.6) 300deg 360deg
                )`,
                                position: 'relative',
                                boxShadow: '0 8px 32px rgba(14,165,233,0.4)',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '70%',
                                    height: '70%',
                                    borderRadius: '50%',
                                    background: theme.palette.mode === 'dark'
                                        ? 'rgba(15,23,42,0.95)'
                                        : 'rgba(255,255,255,0.98)'
                                }
                            }}
                        />
                        <Box sx={{
                            position: 'absolute',
                            textAlign: 'center'
                        }}>
                            <Typography variant="h4" sx={{
                                fontWeight: 700,
                                color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#0f172a'
                            }}>
                                85%
                            </Typography>
                            <Typography variant="caption" sx={{
                                color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b'
                            }}>
                                Active
                            </Typography>
                        </Box>
                    </Box>

                    {/* Legend */}
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mt: 2 }}>
                        {[
                            { color: 'rgba(14,165,233,0.9)', label: 'Mobile' },
                            { color: 'rgba(56,189,248,0.8)', label: 'Desktop' },
                            { color: 'rgba(125,211,252,0.7)', label: 'Tablet' }
                        ].map((item, idx) => (
                            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Box sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: item.color
                                }} />
                                <Typography variant="caption" sx={{
                                    color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
                                    fontSize: '0.65rem'
                                }}>
                                    {item.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};
