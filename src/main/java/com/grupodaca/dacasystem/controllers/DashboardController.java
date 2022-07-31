package com.grupodaca.dacasystem.controllers;

import com.grupodaca.dacasystem.dto.response.*;
import com.grupodaca.dacasystem.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@RestController
@Transactional
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    DashboardService dashboardService;

    @GetMapping(value = "/monthlyBilling")
    public ResponseEntity<MonthyAmountResponseDTO> monthlyBilling(@Param(value = "month") @Max(value = 12, message = "El mes ingresado deberá estar entre 1 y 12") @Min(value = 1, message = "El mes ingresado deberá estar entre 1 y 12") Integer month,
                                                                  @Param(value = "year") @NotNull Integer year) {

        return ResponseEntity.ok().body(dashboardService.getBillingByMonth(month, year));
    }
    @GetMapping(value = "/monthlyResume")
    public ResponseEntity<MonthlyResumeResponseListDTO> monthlyResume(@Param(value = "month") @Max(value = 12, message = "El mes ingresado deberá estar entre 1 y 12") @Min(value = 1, message = "El mes ingresado deberá estar entre 1 y 12") Integer month,
                                                                  @Param(value = "year") @NotNull Integer year) {

        return ResponseEntity.ok().body(dashboardService.getResumeByMonth(month, year));
    }
    @GetMapping("/annualBilling")
    public ResponseEntity<YearAmountResponseDTO> annualBilling(@Param(value = "year") @NotNull Integer year) {

        return ResponseEntity.ok().body(dashboardService.getBillingByYear(year));
    }
    @GetMapping(value = "/monthlyExpenses")
    public ResponseEntity<MonthyAmountResponseDTO> monthlyExpenses(@Param(value = "month") @Max(value = 12, message = "El mes ingresado deberá estar entre 1 y 12") @Min(value = 1, message = "El mes ingresado deberá estar entre 1 y 12") Integer month,
                                                                   @Param(value = "year") @NotNull Integer year) {

        return ResponseEntity.ok().body(dashboardService.getExpensesByMonth(month, year));
    }
    @GetMapping("/annualExpenses")
    public ResponseEntity<YearAmountResponseDTO> annualExpenses(@Param(value = "year") @NotNull Integer year) {

        return ResponseEntity.ok().body(dashboardService.getExpensesByYear(year));
    }
    @GetMapping(value = "/monthlyIVASales")
    public ResponseEntity<IvaSalesResponseDTO> monthlyIVASales(@Param(value = "month") @Max(value = 12, message = "El mes ingresado deberá estar entre 1 y 12") @Min(value = 1, message = "El mes ingresado deberá estar entre 1 y 12") Integer month,
                                                               @Param(value = "year") @NotNull Integer year) {

        return ResponseEntity.ok().body(dashboardService.getIVASalesByMonth(month, year));
    }
    @GetMapping("/annualIVASales")
    public ResponseEntity<AnnualIvaSalesResponseDTO> annualIVASales(@Param(value = "year") @NotNull Integer year) {

        return ResponseEntity.ok().body(dashboardService.getIVASalesByYear(year));
    }
    @GetMapping(value = "/monthlyIVAPurchase")
    public ResponseEntity<IvaPurchaseResponseDTO> monthlyIVAPurchase(@Param(value = "month") @Max(value = 12, message = "El mes ingresado deberá estar entre 1 y 12") @Min(value = 1, message = "El mes ingresado deberá estar entre 1 y 12") Integer month,
                                                                     @Param(value = "year") @NotNull Integer year) {

        return ResponseEntity.ok().body(dashboardService.getIVAPurchaseByMonth(month, year));
    }
    @GetMapping("/annualIVAPurchase")
    public ResponseEntity<AnnualIvaPurchaseResponseDTO> annualIVAPurchase(@Param(value = "year") @NotNull Integer year) {

        return ResponseEntity.ok().body(dashboardService.getIVAPurchaseByYear(year));
    }
}
