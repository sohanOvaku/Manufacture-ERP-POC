package in.ovaku.ManufacturerErpPoc.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

//@Getter
//@Setter
@Entity
//@AllArgsConstructor
//@NoArgsConstructor
//@Builder
public class BillOfMaterial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "orders_id", nullable = false)
    private Orders orders;

    private double ironUsed;
    private double nickelUsed;

    @Column(updatable = false)
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedDate;

    public BillOfMaterial() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Orders getOrder() {
        return orders;
    }

    public void setOrder(Orders orders) {
        this.orders = orders;
    }

    public double getIronUsed() {
        return ironUsed;
    }

    public void setIronUsed(double ironUsed) {
        this.ironUsed = ironUsed;
    }

    public double getNickelUsed() {
        return nickelUsed;
    }

    public void setNickelUsed(double nickelUsed) {
        this.nickelUsed = nickelUsed;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }
}
