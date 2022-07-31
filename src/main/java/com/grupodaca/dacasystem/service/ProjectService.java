package com.grupodaca.dacasystem.service;

import com.grupodaca.dacasystem.dto.request.ProjectRequestDTO;
import com.grupodaca.dacasystem.dto.response.ProjectListResponseDTO;
import com.grupodaca.dacasystem.dto.response.ProjectResponseDTO;
import com.grupodaca.dacasystem.entity.Project;
import com.grupodaca.dacasystem.repository.ProjectRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService implements IProjectService{

    @Autowired
    ProjectRepository projectRepository;

    ModelMapper mapper = new ModelMapper();
    @Override
    public Long addProject(ProjectRequestDTO projectRequestDTO) {
        Project project = mapper.map(projectRequestDTO, Project.class);

        project = projectRepository.save(project);

        return project.getId();
    }

    @Override
    public List<ProjectResponseDTO> projectList() {
        List<Project> projectList = projectRepository.findAll();
        List<ProjectResponseDTO> projectsResponseDTOList = new ArrayList<>();
        projectsResponseDTOList = projectList.stream().map(
                        project -> mapper.map(project, ProjectResponseDTO.class)
                ).collect(Collectors.toList());

        return projectsResponseDTOList;
    }

    @Override
    public void deleteProject(long id) {
        projectRepository.deleteById(id);
    }

    @Override
    public long updateProject(long id, ProjectRequestDTO projectRequestDTO) {

        Project project = projectRepository.findProjectById(id);

        project.setName(projectRequestDTO.getName());
        project.setAddress(projectRequestDTO.getAddress());
        project.setLocation(projectRequestDTO.getLocation());
        project.setCustomer(projectRequestDTO.getCustomer());
        project.setPurchaseOrderAmount(projectRequestDTO.getPurchaseOrderAmount());
        project.setMts2(projectRequestDTO.getMts2());
        project.setNumberOfModules(projectRequestDTO.getNumberOfModules());
        project.setAmountOfAluminum(projectRequestDTO.getAmountOfAluminum());
        project.setPercentageOfCompletion(projectRequestDTO.getPercentageOfCompletion());
        project.setPurchaseOrderDate(projectRequestDTO.getPurchaseOrderDate());
        project.setStartDate(projectRequestDTO.getStartDate());
        project.setLastCertificationDate(projectRequestDTO.getLastCertificationDate());
        project.setNotes(projectRequestDTO.getNotes());

        return projectRequestDTO.getId();
    }
}
