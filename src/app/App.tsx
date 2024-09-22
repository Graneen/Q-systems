import React, { useState } from 'react';
import {
  Typography,
  Button,
  Box,
  TextField,
  Chip,
  Paper,
  Skeleton,
} from '@mui/material';

import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';
import Header from '../header/Header';

export interface JobData {
  title: string;
  description: string;
  salary: string;
  city: string;
  employer: string;
}


const generateJob = (index: number): JobData => {

  const salaryStart = Math.floor(Math.random() * ((300000 - 40000 - 30000) / 20000 + 1)) * 10000 + 40000;
  const salaryDelta = Math.floor(Math.min(salaryStart + 30000, 300000) / 10000) * 10000;
  const cities = ["Кимры", "Дубна", "Рогачёво", "Конаково"];

  return {
    title: `Вакансия №${index + 1}`,
    description: 'Описание вакансии...',
    salary: `${salaryStart.toLocaleString()} - ${salaryDelta.toLocaleString()} на руки`,
    city: cities[Math.floor(Math.random() * cities.length)],
    employer: `ООО "ОПТИМУС"`
  };
};

const INITIAL_JOBS = Array.from({ length: 20 }, (_, i) => generateJob(i));

const App: React.FC = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [city, setCity] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [jobs, setJobs] = useState(INITIAL_JOBS);

  const addSkillHandler = () => {
    if (skillInput.trim()) {
      setSkills((prev) => [...prev, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const fetchMoreData = () => {
    if (jobs.length >= 100) {
      setHasMore(false);
      return;
    }
    const newJobs = Array.from({ length: 20 }, (_, i) => generateJob(jobs.length + i));
    setJobs((prev) => [...prev, ...newJobs]);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />

      <Box display="flex" sx={{ height: '100%' }}>
        <Box className="sidebar">
          <Button variant="contained" color="primary" sx={{ width: '30%'}}>
            Вакансии
          </Button>
          <Button variant="contained" color="primary" sx={{ width: '30%', marginTop: 5 }}>
            Курсы
          </Button>
        </Box>

        <Box display="flex" flexDirection="column" className="rightbar">
          <Box sx={{ backgroundColor: '#838383', height: "100px", display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '10px 0 0 0' }} >
            <Typography variant="h5" marginLeft={4} fontWeight="bold">
              Вакансии
            </Typography>
          </Box>



          <Box className="finders" display="flex" alignItems="center" flexWrap="wrap">
            <Box className="finderOne">
              <TextField
                label="Навыки"
                value={skillInput}
                InputProps={{
                  startAdornment: (
                    <Box className="chip-container">
                      {skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          onDelete={() => setSkills(skills.filter((s) => s !== skill))}
                          sx={{ margin: 0.5 }}
                        />
                      ))}
                    </Box>
                  ),
                }}
                onChange={(e) => setSkillInput(e.target.value)}
                variant="outlined"
                size="small"
                className="skills-input"
              />
              <Button onClick={addSkillHandler} variant="contained" sx={{ marginLeft: 1 }}>
                Добавить
              </Button>
            </Box>
            <Box className="finderTwo">
              <TextField
                label="Город"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ marginLeft: 2 }}
              />
              <Button variant="contained" sx={{ marginLeft: 1 }}>
                Найти
              </Button>
            </Box>
          </Box>


          <Box className="content">

            <InfiniteScroll
              dataLength={jobs.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<Skeleton />}
            >
              <Box className="job-container">
                {jobs.map((job, index) => (
                  <Paper key={index} elevation={2} className="job-card">
                    <Typography variant="h5">{job.title}</Typography>
                    <Typography variant="body2">{job.description}</Typography>
                    <div className="salaryWithAgeChip">
                      <Typography variant="body1" color="black">
                        {job.salary}
                      </Typography>
                      <Chip label="Опыт 3-6 лет" sx={{ backgroundColor: '#e0f7fa', borderRadius: '5px' }} />
                    </div>
                    <Typography variant="body1">
                      {job.city}
                    </Typography>
                    <Typography variant="body1">
                      {job.employer}
                    </Typography>
                    <Button variant="contained" sx={{ marginTop: 1, marginRight: 2 }}>
                      Откликнуться
                    </Button>
                    <Button variant="outlined" sx={{ marginTop: 1 }}>
                      Просмотреть контент
                    </Button>
                  </Paper>
                ))}
              </Box>
            </InfiniteScroll>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
