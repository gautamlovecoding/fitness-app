import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { fetchData, exerciseOptions, youtubeOptions } from "../utils/fetchData";
import Detail from "../Components/Detail";
import ExerciseVideos from "../Components/ExerciseVideos";
import SimilarExercise from "../Components/SimilarExercise";

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExerciseData = async () => {
      const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl = "https://youtube-search-and-download.p.rapidapi.com";

      const exerciseDetailData = await fetchData(
        `${exerciseDbUrl}/exercises/exercise/${id}`,
        exerciseOptions
      );
      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions);
      setExerciseVideos(exerciseVideosData?.contents)

      const targetMuscleExerciseData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
      setTargetMuscleExercises(targetMuscleExerciseData);
      
      const equipmentExerciseData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
      setEquipmentExercises(equipmentExerciseData)

    };
    fetchExerciseData();
  }, [id]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name}/>
      <SimilarExercise equipmentExercises={equipmentExercises} targetMuscleExercises={targetMuscleExercises}/>
    </Box>
  );
};

export default ExerciseDetail;
