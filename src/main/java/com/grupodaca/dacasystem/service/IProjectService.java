package com.grupodaca.dacasystem.service;

import com.grupodaca.dacasystem.dto.request.ProjectRequestDTO;
import com.grupodaca.dacasystem.dto.response.ProjectListResponseDTO;
import com.grupodaca.dacasystem.dto.response.ProjectResponseDTO;

import java.util.List;

public interface IProjectService {

    Long addProject(ProjectRequestDTO projectRequestDTO);

    List<ProjectResponseDTO> projectList();

    void deleteProject(long id);

    long updateProject(long id, ProjectRequestDTO projectRequestDTO);
}
