package com.grupodaca.dacasystem.controllers;

import com.grupodaca.dacasystem.dto.SuccessDTO;
import com.grupodaca.dacasystem.dto.request.CustomerRequestDTO;
import com.grupodaca.dacasystem.dto.request.ProjectRequestDTO;
import com.grupodaca.dacasystem.dto.response.CustomerListResponseDTO;
import com.grupodaca.dacasystem.dto.response.ProjectListResponseDTO;
import com.grupodaca.dacasystem.dto.response.ProjectResponseDTO;
import com.grupodaca.dacasystem.service.IProjectService;
import com.grupodaca.dacasystem.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@Transactional
@RequestMapping("/api")
public class ProjectController {

    @Autowired
    IProjectService projectService;

    @PostMapping("/project")
    public ResponseEntity<SuccessDTO> addProject(@RequestBody ProjectRequestDTO dto){
        if(projectService.addProject(dto)!=null){
            return ResponseEntity.ok().body(new SuccessDTO("Proyecto agregado con éxito", 201));
        } else{
            throw new RuntimeException();
        }

    }
    @GetMapping("/project")
    public ResponseEntity<List<ProjectResponseDTO>> findAllProjects(){
        List<ProjectResponseDTO> projectResponseDTO = projectService.projectList();
        return ResponseEntity.ok().body(projectResponseDTO);
    }
    @DeleteMapping("/project/{id}")
    public ResponseEntity<SuccessDTO> deleteProject(@PathVariable long id){
        projectService.deleteProject(id);
        return ResponseEntity.ok().body(new SuccessDTO("Proyecto eliminado con éxito", 201));
    }
    @PutMapping("/project/{id}")
    public ResponseEntity<SuccessDTO> updateCustomer(@RequestBody ProjectRequestDTO dto, @PathVariable long id){
        projectService.updateProject(id,dto);
        return ResponseEntity.ok().body(new SuccessDTO("Proyecto modificado con éxito", 201));
    }
}
